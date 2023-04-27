import { useCallback, useEffect, useRef } from 'react';
import {
  Call,
  disposeOfMediaStream,
  getAudioStream,
  OwnCapability,
  SfuModels,
  watchForAddedDefaultAudioDevice,
  watchForDisconnectedAudioDevice,
} from '@stream-io/video-client';
import { map } from 'rxjs';

/**
 * Exclude types from documentaiton site, but we should still add doc comments
 * @internal
 */
export type AudioPublisherInit = {
  call?: Call;
  initialAudioMuted?: boolean;
  audioDeviceId?: string;
};

/**
 *
 * @param param0
 * @returns
 *
 * @category Device Management
 */
export const useAudioPublisher = ({
  call,
  initialAudioMuted,
  audioDeviceId,
}: AudioPublisherInit) => {
  const callState = call?.state;
  const { localParticipant$ } = callState || {};
  // helper reference to determine initial publishing of the media stream
  const initialPublishExecuted = useRef<boolean>(false);
  const participant = localParticipant$
    ? callState?.localParticipant
    : undefined;

  const isPublishingAudio = participant?.publishedTracks.includes(
    SfuModels.TrackType.AUDIO,
  );

  const publishAudioStream = useCallback(async () => {
    if (!call) return;
    if (!call.permissionsContext.hasPermission(OwnCapability.SEND_AUDIO)) {
      console.log(`No permission to publish audio`);
      return;
    }
    try {
      const audioStream = await getAudioStream(audioDeviceId);
      await call.publishAudioStream(audioStream);
    } catch (e) {
      console.log('Failed to publish audio stream', e);
    }
  }, [audioDeviceId, call]);

  useEffect(() => {
    let interrupted = false;

    if (!call && initialPublishExecuted.current) {
      initialPublishExecuted.current = false;
    }

    if (
      !call ||
      !call.permissionsContext.hasPermission(OwnCapability.SEND_AUDIO) ||
      // FIXME: remove "&& !initialPublishExecuted.current" and make
      // sure initialAudioMuted is not changing during active call
      (initialAudioMuted && !initialPublishExecuted.current) ||
      (!isPublishingAudio && initialPublishExecuted.current)
    ) {
      return;
    }

    getAudioStream(audioDeviceId).then((stream) => {
      if (interrupted) {
        return disposeOfMediaStream(stream);
      }

      initialPublishExecuted.current = true;
      return call.publishAudioStream(stream);
    });

    return () => {
      interrupted = true;
      call.stopPublish(SfuModels.TrackType.AUDIO);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call, audioDeviceId]);

  useEffect(() => {
    if (!localParticipant$) return;
    const subscription = watchForDisconnectedAudioDevice(
      localParticipant$.pipe(map((p) => p?.audioDeviceId)),
    ).subscribe(async () => {
      if (!call) return;
      call.setAudioDevice(undefined);
      await call.stopPublish(SfuModels.TrackType.AUDIO);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [localParticipant$, call]);

  useEffect(() => {
    if (!participant?.audioStream || !call || !isPublishingAudio) return;

    const [track] = participant.audioStream.getAudioTracks();
    const selectedAudioDeviceId = track.getSettings().deviceId;

    const republishDefaultDevice = watchForAddedDefaultAudioDevice().subscribe(
      async () => {
        if (
          !(
            call &&
            participant.audioStream &&
            selectedAudioDeviceId === 'default'
          )
        )
          return;
        // We need to stop the original track first in order
        // we can retrieve the new default device stream
        track.stop();
        const audioStream = await getAudioStream('default');
        await call.publishAudioStream(audioStream);
      },
    );

    const handleTrackEnded = async () => {
      if (selectedAudioDeviceId === audioDeviceId) {
        const audioStream = await getAudioStream(audioDeviceId);
        await call.publishAudioStream(audioStream);
      }
    };

    track.addEventListener('ended', handleTrackEnded);
    return () => {
      track.removeEventListener('ended', handleTrackEnded);
      republishDefaultDevice.unsubscribe();
    };
  }, [audioDeviceId, call, participant?.audioStream, isPublishingAudio]);

  return publishAudioStream;
};