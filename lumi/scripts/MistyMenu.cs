using UnityEngine;

public class MistyMenu : MonoBehaviour
{
    public AudioSource mistyAudioSource;
    public AudioSource menuMusicSource;

    private bool hasStarted = false;
    private bool hasEnded = false;

    void Start(){
        if (mistyAudioSource == null) mistyAudioSource = GetComponent<AudioSource>();
    }

    void Update(){
        if (mistyAudioSource.isPlaying && !hasStarted) { hasStarted = true;
            if (menuMusicSource != null && menuMusicSource.isPlaying){
                menuMusicSource.Pause();
            }
        }

        if (!mistyAudioSource.isPlaying && hasStarted && !hasEnded){ hasEnded = true;
            if (menuMusicSource != null){
                menuMusicSource.UnPause();
            }
        }
    }
}
