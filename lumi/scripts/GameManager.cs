using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance;

    public enum Difficulty { Easy, Medium, Hard }
    [Header("Settings")]
    public Difficulty currentDifficulty = Difficulty.Medium;

    public bool isMistyEnabled = false;
    private string releaseVersion = "v0.26.3.24";

    private float globalVolume = .7f;
    private int deathCount = 0;

    private Dictionary<string, int> levelStars = new Dictionary<string, int>();

    public string GetVersion()
    {
        return releaseVersion;
    }

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
            LoadDeathCount();
            LoadStarData();
        }
        else
        {
            Destroy(gameObject);
        }
    }

    private void Start()
    {
        StartCoroutine(FadeInAllAudio(globalVolume, 0.8f));
    }

    public void SetVolume(float value)
    {
        globalVolume = value;
        StartCoroutine(FadeInAllAudio(globalVolume, 0.8f));
    }

    public float GetVolume()
    {
        return globalVolume;
    }

    private IEnumerator FadeInAllAudio(float targetVolume, float duration)
    {
        AudioSource[] audioSources = FindObjectsOfType<AudioSource>();
        if (audioSources.Length == 0)
            yield break;

        float elapsed = 0f;

        for (int i = 0; i < audioSources.Length; i++)
            audioSources[i].volume = 0f;

        while (elapsed < duration)
        {
            elapsed += Time.deltaTime;
            float t = elapsed / duration;

            foreach (AudioSource source in audioSources)
                source.volume = Mathf.Lerp(0f, targetVolume, t);

            yield return null;
        }

        foreach (AudioSource source in audioSources)
            source.volume = targetVolume;
    }

    public void AddDeath()
    {
        deathCount++;
        PlayerPrefs.SetInt("DeathCount", deathCount);
        PlayerPrefs.Save();
    }

    public void SetDeathCount(int value)
    {
        deathCount = value;
        PlayerPrefs.SetInt("DeathCount", deathCount);
        PlayerPrefs.Save();
    }

    public int GetDeathCount()
    {
        return deathCount;
    }

    private void LoadDeathCount()
    {
        deathCount = PlayerPrefs.GetInt("DeathCount", 0);
    }

    public void SaveLevelStars(string levelName, int starsEarned)
    {
        if (string.IsNullOrEmpty(levelName))
            levelName = SceneManager.GetActiveScene().name;

        if (levelStars.ContainsKey(levelName))
        {
            if (starsEarned > levelStars[levelName])
                levelStars[levelName] = starsEarned;
        }
        else
        {
            levelStars[levelName] = starsEarned;
        }

        PlayerPrefs.SetInt("Stars_" + levelName, levelStars[levelName]);
        PlayerPrefs.Save();
    }

    public int GetLevelStars(string levelName)
    {
        if (levelStars.TryGetValue(levelName, out int stars))
        {
            return stars;
        }

        int savedStars = PlayerPrefs.GetInt("Stars_" + levelName, 0);
        levelStars[levelName] = savedStars;
        return savedStars;
    }

    private void LoadStarData()
    {
        levelStars.Clear();
    }

    public void ResetAllData()
    {
        PlayerPrefs.DeleteAll();
        PlayerPrefs.Save();

        deathCount = 0;
        levelStars.Clear();
        isMistyEnabled = false;
        currentDifficulty = Difficulty.Easy;
    }
}