using UnityEngine;

public class MusicFader : MonoBehaviour
{
    public AudioSource audioSource;
    public float fadeDuration = 5f;

    public float startVolume = 0f;
    public float targetVolume = 1f;
    public float timer = 0f;

    void Start()
    {
        audioSource.volume = startVolume;
    }

    void Update()
    {
        if (timer < fadeDuration)
        {
            timer += Time.deltaTime;
            float t = timer / fadeDuration;
            audioSource.volume = Mathf.Lerp(startVolume, targetVolume, t);
        }
    }
}