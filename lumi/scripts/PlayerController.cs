using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.InputSystem;

public class PlayerController : MonoBehaviour
{
    [Header("Movement")]
    public InputSystem_Actions playerControls;
    public InputAction playerInteractions;
    public InputAction playerMove;
    public Vector2 direction;
    public Vector2 freezedZeroDir;
    public LayerMask layerMask;
    public LayerMask enemyLayerMask;
    public bool shutDownCompiler;
    public bool isMoving = false;
    public bool canMove;
    public int freezedZeroDis;
    public float moveSpeed;
    public AudioClip whoosh;

    [Header("Camera Controlls")]
    public GameObject cinematicCamera;
    public GameObject orientalCamera;
    public GameObject gameOverCamera;

    [Header("Star Teleportation")]
    public bool starTPTriggered;
    private string[] starTags = { "Yellow Star", "Purple Star", "Blue Star", "White Star", "Red Star", "Green Star" };

    [Header("Obstacle Triggering")]
    public bool obstacleMoving;
    public bool freezeMovement;
    public bool obstacleDetection;
    public GameObject triggerUp;
    public GameObject triggerDown;
    public GameObject triggerRight;
    public GameObject triggerLeft;
    public float fadeSpeed = 0.5f;

    [Header("Step Tracking")]
    public int currentStepCounts;
    public GameObject traceObject;
    public bool coolDownTrace;

    [Header("Interactions")]
    public GameObject questionMark;

    [Header("Summoning Sprite")]
    public GameObject SummoningCircle;

    [Header("Orbs")]
    public int Orbs;
    public Text ScoreText;
    public AudioClip orbClip;

    [Header("Doughnut")]
    public int Doughnuts;
    public AudioClip doughnutClip;
    public Text doughnutText;

    [Header("Finish")]
    public GameObject EndScreen;

    [Header("Animations")]
    public Animator animator;

    [Header("Sounds")]
    public AudioSource audioSource;

    [Header("Winning")]
    public bool playerWon;
    public AudioClip winClip;
    public WinZoom winZoomScript;
    public GameObject playerCamera;
    public GameObject genericUIElements;
    public bool wining = false;
    public bool apertureSet;
    public bool stopActions;

    [Header("Timer")]
    public float fadeOutTimerDelay;
    public Text timerText;
    private float timer = 0f;
    private int secondsElapsed = 0;
    public bool timerStop;

    [Header("Statistics")]
    public Text endOrbs;
    public Text endDoughnuts;
    public Text endTime;

    [Header("Star Ratings")]
    public GameObject StarLevelOne;
    public GameObject StarLevelTwo;
    public GameObject StarLevelThree;
    private float levelOneDoughnut;
    private float levelTwoDoughnut;
    private float levelThreeDoughnut;
    private float levelOneOrbs;
    private float levelTwoOrbs;
    private float levelThreeOrbs;

    [Header("Dying")]
    public bool closeDeath = false;
    public bool playerDead;
    public bool playerRestart;
    public GameObject fadeOut;
    public GameObject loadingCherry;
    public GameObject gameOverSound;
    public GameObject deathThunder;
    public GameObject allUI;

    [Header("Text Bubbles")]
    public GameObject WinBubble;

    [Header("UI Elements")]
    public GameObject PauseButton;
    public GameObject goldenDoughnutUI;
    public GameObject descriptorManager;

    [Header("Camera Controls")]
    PlayerStep playerStep;
    public GameObject cameraObject;

    [Header("Eye Controls")]
    public GameObject eyeObject;
    PlayerEye playerEye;

    private DescriptionOverHover lumiDescription;

    public GameObject triggerObject;
    public Slider timerSlider;
    private float remainingTime;
    public float startTimeInSeconds;
    private bool timerRunning = true;
    public string overrideSceneName = "";

    private void OnEnable()
    {
        playerStep = cameraObject.GetComponent<PlayerStep>();
        playerMove = playerControls.Player.Move;
        playerMove.Enable();

        playerInteractions = playerControls.Player.Interact;
        playerInteractions.Enable();
        playerInteractions.performed += Interact;

    }
    private void OnDisable() { playerMove.Disable(); }

    public void Awake()
    {
        playerControls = new InputSystem_Actions();
    }
    private void Start()
    {
        eyeObject = GameObject.FindGameObjectWithTag("PlayerEye");
        playerEye = eyeObject.GetComponent<PlayerEye>();
        StartCoroutine(DelayTimerStart());
        audioSource = GetComponent<AudioSource>();
        GenerateLevelValues();
        lumiDescription = gameObject.GetComponent<DescriptionOverHover>();
    }

    public void Update()
    {
        if (timerStop) return;

        timer += Time.deltaTime;

        while (timer >= 1f)
        {
            secondsElapsed++;
            timer -= 1f;
        }

        if (isMoving)
        {
            SummoningCircle.SetActive(true);
            if (!coolDownTrace) { coolDownTrace = true; StartCoroutine(TracePlayer()); }
        }

        Vector2 filteredInput = Vector2.zero;
        if (Mathf.Abs(playerMove.ReadValue<Vector2>().x) > Mathf.Abs(playerMove.ReadValue<Vector2>().y))
        {
            filteredInput.x = Mathf.Sign(playerMove.ReadValue<Vector2>().x);
        }
        else if (Mathf.Abs(playerMove.ReadValue<Vector2>().y) > Mathf.Abs(playerMove.ReadValue<Vector2>().x))
        {
            filteredInput.y = Mathf.Sign(playerMove.ReadValue<Vector2>().y);
        }

        if (MovementAllowance() && filteredInput != Vector2.zero)
        {
            isMoving = true;
            direction = filteredInput;
            StartCoroutine(MovementManager(direction));
        }

        if (playerDead)
        {
            StartCoroutine(PlayerDeath());
            gameOverSound.SetActive(true);
        }

        endOrbs.text = Orbs.ToString() + "/" + levelThreeOrbs;
        endDoughnuts.text = Doughnuts.ToString() + "/" + levelThreeDoughnut;
        endTime.text = secondsElapsed.ToString() + " Sec";

        ScoreText.text = Orbs.ToString() + "x";
        doughnutText.text = Doughnuts.ToString() + "x";
    }
    public bool MovementAllowance()
    {
        if (!isMoving && !obstacleMoving && canMove) return true;
        else return false;
    }
    public void VibrateController(float duration, float frequency)
    {
        if (Gamepad.current != null)
        {
            Gamepad.current.SetMotorSpeeds(frequency, frequency);
            Invoke("StopVibration", duration);
        }
    }

    void StopVibration()
    {
        if (Gamepad.current != null)
            Gamepad.current.SetMotorSpeeds(0f, 0f);
    }

    public void StartTimer() { timerStop = false; }
    public IEnumerator DelayTimerStart()
    {
        yield return new WaitForSeconds(fadeOutTimerDelay);
        StartTimer();

    }

    public IEnumerator Move(Vector2 targetPosition)
    {
        if (shutDownCompiler == false)
        {
            audioSource.clip = whoosh;
            audioSource.volume = 0.3f;
            audioSource.Play();
            isMoving = true;
            Vector2 startPosition = transform.position;
            float elapsedTime = 0f;
            float duration = Vector2.Distance(startPosition, targetPosition) / moveSpeed;

            while (elapsedTime < duration)
            {
                float t = elapsedTime / duration;
                t = Mathf.SmoothStep(0f, 1f, t);
                transform.position = Vector2.Lerp(startPosition, targetPosition, t);
                elapsedTime += Time.deltaTime;
                yield return null;
            }

            if (!CheckPosition(targetPosition))
            {
                transform.position = targetPosition;
            }
        }
    }

    public bool CheckPosition(Vector2 targetPosition) { return (Vector2)transform.position == targetPosition; }

    public IEnumerator TracePlayer()
    {
        yield return new WaitForSeconds(0.0f);
        Instantiate(traceObject, transform.position, transform.rotation);
        coolDownTrace = false;
    }
    private void Interact(InputAction.CallbackContext context)
    {

        print("Interaction triggered");
        starTPTriggered = true;
    }

    public IEnumerator MovementManager(Vector2 direction)
    {
        StartCoroutine(TriggerObstacle(direction));
        if (!HitWall(direction, 1))
        {
            currentStepCounts++;
            print(currentStepCounts);
            yield return StartCoroutine(Move(new Vector2(transform.position.x, transform.position.y) + direction * 1));
        }
        else { print("Movement blocked by wall!"); }
        stopActions = false;
        isMoving = false;
    }

    public IEnumerator TriggerObstacle(Vector2 direction)
    {
        direction = direction.normalized;

        if (direction == Vector2.up)
        {
            triggerUp.SetActive(true);
            yield return new WaitForSeconds(0.2f);
            triggerUp.SetActive(false);
        }
        else if (direction == Vector2.down)
        {
            triggerDown.SetActive(true);
            yield return new WaitForSeconds(0.2f);
            triggerDown.SetActive(false);
        }
        else if (direction == Vector2.left)
        {
            triggerLeft.SetActive(true);
            yield return new WaitForSeconds(0.2f);
            triggerLeft.SetActive(false);
        }
        else if (direction == Vector2.right)
        {
            triggerRight.SetActive(true);
            yield return new WaitForSeconds(0.2f);
            triggerRight.SetActive(false);
        }
    }

    public bool HitWall(Vector2 direction, float distance)
    {
        playerEye.MoveEye(direction);
        float checkDistance = distance + 0.3f;
        Debug.DrawRay(transform.position, direction * checkDistance, Color.red);
        RaycastHit2D hit = Physics2D.Raycast(transform.position, direction, checkDistance, layerMask);

        if (hit.collider != null)
        {
            if (hit.collider.CompareTag("Wall") ||
                hit.collider.CompareTag("Prism Top Left") ||
                hit.collider.CompareTag("Prism Top Right") ||
                hit.collider.CompareTag("Prism Bottom Left") ||
                hit.collider.CompareTag("Prism Bottom Right"))
            {
                Debug.Log("Obstacle detected: " + hit.collider.tag);
                return true;
            }
        }
        return false;
    }

    public IEnumerator LoadNextLevel()
    {
        lumiDescription.enabled = false;
        Destroy(questionMark);
        descriptorManager.SetActive(false);
        playerWon = true;
        timerStop = true;
        cinematicCamera.SetActive(true);
        orientalCamera.SetActive(false);
        shutDownCompiler = true;
        PauseButton.SetActive(false);
        Destroy(SummoningCircle);
        WinBubble.SetActive(true);
        stopActions = true;
        animator.Play("Happy");
        audioSource.volume = 0.5f;
        audioSource.clip = winClip;
        audioSource.Play();
        genericUIElements.SetActive(false);
        yield return new WaitForSeconds(3);
        wining = true;
        EndScreen.SetActive(true);
        StarRatingSystem();
    }

    public IEnumerator PlayerDeath()
    {
        if (playerWon == false && closeDeath == false)
        {
            GameManager.Instance.AddDeath();
            VibrateController(1f, 1f);
            lumiDescription.enabled = false;
            Destroy(questionMark);
            descriptorManager.SetActive(false);
            shutDownCompiler = true;
            closeDeath = true;
            stopActions = true;
            gameOverCamera.SetActive(true);
            orientalCamera.SetActive(false);
            playerDead = false;
            allUI.SetActive(false);
            PauseButton.SetActive(false);
            genericUIElements.SetActive(false);
            Instantiate(deathThunder, gameObject.transform.position, gameObject.transform.rotation);
            audioSource.Play();
            yield return new WaitForSeconds(2);
            fadeOut.SetActive(true);
            loadingCherry.SetActive(true);
            yield return new WaitForSeconds(3);
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.tag == "Orb") { VibrateController(0.1f, 0.2f); Orbs += 1; audioSource.clip = orbClip; audioSource.volume = 1f; audioSource.Play(); }
        if (other.gameObject.tag == "Doughnut") { VibrateController(0.1f, 0.3f); Doughnuts += 1; audioSource.clip = doughnutClip; audioSource.Play(); }
        if (other.gameObject.tag == "EndGate") { VibrateController(0.2f, 0.5f); StartCoroutine(LoadNextLevel()); }
        if (other.gameObject.tag == "Cutscene") { orientalCamera.SetActive(false); SummoningCircle.SetActive(false); }
        if (other.gameObject.tag == "Spikes") StartCoroutine(PlayerDeath());
        if (other.gameObject.tag == "LaserBeam") StartCoroutine(PlayerDeath());
        if (other.gameObject.tag == "Enemy") StartCoroutine(PlayerDeath());
    }

    void OnTriggerStay2D(Collider2D other) { if (other.gameObject.tag == "Enemy" && !isMoving) { StartCoroutine(PlayerDeath()); } }

    public void GenerateLevelValues()
    {
        levelOneDoughnut = Mathf.Round(0.3f * GameObject.FindGameObjectsWithTag("Doughnut").Length);
        levelTwoDoughnut = Mathf.Round(0.6f * GameObject.FindGameObjectsWithTag("Doughnut").Length);
        levelThreeDoughnut = GameObject.FindGameObjectsWithTag("Doughnut").Length;

        levelOneOrbs = Mathf.Round(0.3f * GameObject.FindGameObjectsWithTag("Orb").Length);
        levelTwoOrbs = Mathf.Round(0.6f * GameObject.FindGameObjectsWithTag("Orb").Length);
        levelThreeOrbs = GameObject.FindGameObjectsWithTag("Orb").Length;
    }

    public void SaveStars(int starsEarned)
    {
        if (GameManager.Instance == null)
        {
            Debug.LogWarning("GameManager not found! Cannot save stars.");
            return;
        }

        string sceneNameToSave = string.IsNullOrEmpty(overrideSceneName)
            ? SceneManager.GetActiveScene().name
            : overrideSceneName;

        GameManager.Instance.SaveLevelStars(sceneNameToSave, starsEarned);

        Debug.Log($"Saved {starsEarned} stars for scene: {sceneNameToSave}");
    }

    public void StarRatingSystem()
    {
        if (Orbs >= levelThreeOrbs && Doughnuts >= levelThreeDoughnut)
        {
            StarLevelOne.SetActive(true);
            StarLevelTwo.SetActive(true);
            StarLevelThree.SetActive(true);
            goldenDoughnutUI.SetActive(true);
            SaveStars(3);
        }
        else if (Orbs >= levelTwoOrbs && Doughnuts >= levelTwoDoughnut)
        {
            StarLevelOne.SetActive(true);
            StarLevelTwo.SetActive(true);
            StarLevelThree.SetActive(false);
            SaveStars(2);
        }
        else if (Orbs >= levelOneOrbs && Doughnuts >= levelOneDoughnut)
        {
            StarLevelOne.SetActive(true);
            StarLevelTwo.SetActive(false);
            StarLevelThree.SetActive(false);
            SaveStars(1);
        }
        else
        {
            StarLevelOne.SetActive(false);
            StarLevelTwo.SetActive(false);
            StarLevelThree.SetActive(false);
            SaveStars(0);
        }
    }
}