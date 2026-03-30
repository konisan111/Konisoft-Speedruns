using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LoadInGame : MonoBehaviour
{
    public float delayAmount;
    public string sceneName;
    public bool uiPressed;
    public bool restartLevel;
    public GameObject loadObject;
    public bool loadInObjectInstead;

    private string currentSceneName;

    void Update()
    {
        currentSceneName = SceneManager.GetActiveScene().name;

        if (!uiPressed && !restartLevel && !loadInObjectInstead)
            StartCoroutine(PlayerRestart(sceneName));
        else if (!uiPressed && restartLevel && !loadInObjectInstead)
            StartCoroutine(PlayerRestart(currentSceneName));
        else if (!uiPressed && !restartLevel && loadInObjectInstead)
            StartCoroutine(LoadObjectIn());
    }

    IEnumerator PlayerRestart(string targetScene)
    {
        yield return new WaitForSeconds(delayAmount - 1f);
        yield return StartCoroutine(FadeOutAllAudio(0.8f));
        yield return new WaitForSeconds(1f - 0.8f);

        SceneManager.LoadScene(targetScene);
    }

    IEnumerator LoadObjectIn()
    {
        yield return new WaitForSeconds(delayAmount);
        loadObject.SetActive(true);
    }

    IEnumerator FadeOutAllAudio(float duration)
    {
        AudioSource[] audioSources = FindObjectsOfType<AudioSource>();
        if (audioSources.Length == 0)
            yield break;

        float elapsed = 0f;
        float[] startVolumes = new float[audioSources.Length];

        for (int i = 0; i < audioSources.Length; i++)
        {
            startVolumes[i] = audioSources[i].volume;
        }

        while (elapsed < duration)
        {
            elapsed += Time.deltaTime;
            float t = elapsed / duration;

            for (int i = 0; i < audioSources.Length; i++)
            {
                audioSources[i].volume = Mathf.Lerp(startVolumes[i], 0f, t);
            }

            yield return null;
        }

        for (int i = 0; i < audioSources.Length; i++)
        {
            audioSources[i].volume = 0f;
        }
    }

    public void OnClickUI()
    {
        if (!restartLevel)
            StartCoroutine(PlayerRestart(sceneName));
        else
            StartCoroutine(PlayerRestart(currentSceneName));
    }
}
