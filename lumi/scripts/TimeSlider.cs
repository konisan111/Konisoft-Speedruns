using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;

public class CountdownTimerImage : MonoBehaviour
{
    [Header("Time Limits")]
    public float countdownSecondsEasy = 10f;
    public float countdownSecondsMedium = 10f;
    public float countdownSecondsHard = 10f;
    private float countdownSeconds = 0f;
    public float startDelay = 3f;

    [Header("Time UI")]
    public Image timeBarImage;
    public GameObject easyObject;
    public GameObject mediumObject;
    public GameObject hardObject;

    [Header("Audio")]
    public AudioSource warningAudio;

    [Header("Coloring")]
    public Color warningColor = Color.red;
    public Color easyColor = new Color32(0, 187, 8, 255);
    public Color mediumColor = new Color32(140, 84, 232, 255);
    public Color hardColor = new Color32(165, 0, 61, 255);

    [Header("Fade")]
    public GameObject timeFade;

    private float currentTime;
    private bool isRunning = false;
    private bool warningActive = false;
    private GameObject playerObject;
    private PlayerController playerController;
    private Coroutine warningCoroutine;

    private Color originalColor;
    private float originalWidth;

    void Start()
    {
        playerObject = GameObject.FindGameObjectWithTag("Player");
        playerController = playerObject.GetComponent<PlayerController>();

        if (timeBarImage == null) return;

        SetupDifficulty();

        originalColor = timeBarImage.color;
        originalWidth = timeBarImage.rectTransform.sizeDelta.x;
        currentTime = countdownSeconds;

        StartCoroutine(StartCountdownWithDelay());
    }

    private void SetupDifficulty()
    {
        GameManager.Difficulty diff = GameManager.Instance.currentDifficulty;

        easyObject?.SetActive(diff == GameManager.Difficulty.Easy);
        mediumObject?.SetActive(diff == GameManager.Difficulty.Medium);
        hardObject?.SetActive(diff == GameManager.Difficulty.Hard);

        if (diff == GameManager.Difficulty.Easy)
        {
            countdownSeconds = countdownSecondsEasy;
            timeBarImage.color = GetEasyColorByLevel();
        }
        else if (diff == GameManager.Difficulty.Medium)
        {
            countdownSeconds = countdownSecondsMedium;
            timeBarImage.color = mediumColor;
        }
        else if (diff == GameManager.Difficulty.Hard)
        {
            countdownSeconds = countdownSecondsHard;
            timeBarImage.color = hardColor;
        }
    }

    private Color GetEasyColorByLevel()
    {
        string sceneName = SceneManager.GetActiveScene().name;
        int levelNumber = ExtractLevelNumber(sceneName);

        if (levelNumber >= 1 && levelNumber <= 4) return easyColor;
        if (levelNumber >= 5 && levelNumber <= 9) return new Color32(255, 105, 180, 255);
        if (levelNumber >= 10 && levelNumber <= 15) return Color.blue;

        return easyColor;
    }

    private int ExtractLevelNumber(string name)
    {
        string digits = System.Text.RegularExpressions.Regex.Replace(name, @"\D", "");
        return int.TryParse(digits, out int result) ? result : 0;
    }

    private IEnumerator StartCountdownWithDelay()
    {
        yield return new WaitForSeconds(startDelay);
        isRunning = true;
    }

    void Update()
    {
        if (!isRunning || playerController.timerStop) return;

        currentTime -= Time.deltaTime;
        currentTime = Mathf.Clamp(currentTime, 0f, countdownSeconds);

        float width = Mathf.Lerp(0f, originalWidth, currentTime / countdownSeconds);
        Vector2 size = timeBarImage.rectTransform.sizeDelta;
        size.x = width;
        timeBarImage.rectTransform.sizeDelta = size;

        if (currentTime <= 3f && !warningActive)
        {
            warningActive = true;
            warningCoroutine = StartCoroutine(WarningFlash());
        }

        if (currentTime <= 0f)
        {
            isRunning = false;
            if (warningCoroutine != null) StopCoroutine(warningCoroutine);
            timeBarImage.color = originalColor;
            playerController.playerWon = false;
            playerController.closeDeath = false;
            timeFade.SetActive(true);
            StartCoroutine(playerController.PlayerDeath());
        }
    }

    private IEnumerator WarningFlash()
    {
        while (currentTime > 0f)
        {
            float flashSpeed = Mathf.Lerp(0.1f, 0.5f, currentTime / 3f);
            timeBarImage.color = warningColor;
            PlayWarningSound();
            yield return new WaitForSeconds(flashSpeed);
            timeBarImage.color = originalColor;
            yield return new WaitForSeconds(flashSpeed);
        }
    }

    private void PlayWarningSound()
    {
        if (warningAudio != null)
        {
            warningAudio.pitch = Mathf.Lerp(1.8f, 1f, currentTime / 3f);
            warningAudio.Play();
        }
    }
}