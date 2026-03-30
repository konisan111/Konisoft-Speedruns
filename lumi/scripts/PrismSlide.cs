using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

public class PrismSlide : MonoBehaviour
{
    [Header("Particle System Management")]
    public ParticleSystem particleSystem;

    [Header("Audio")]
    public AudioSource audioSource;

    [Header("Values")]
    public float slideDistance = 1f;
    public float slideDuration = 0.5f;
    public float raycastOffset = 0.5f;
    public LayerMask wallLayer;
    public LayerMask enemyLayer;
    public GameObject playerObject;
    public bool killPlayerDeath = false;
    PlayerController playerController;

    private Dictionary<Vector2, bool> blockedDirections = new();

    void Start()
    {
        particleSystem.Pause();
        playerObject = GameObject.FindGameObjectWithTag("Player");
    }

    void Update()
    {
        DetectWalls();
    }

    void DetectWalls()
    {
        blockedDirections.Clear();
        Vector2[] directions = { Vector2.up, Vector2.down, Vector2.left, Vector2.right };

        foreach (Vector2 dir in directions)
        {
            Vector2 origin = (Vector2)transform.position + dir * raycastOffset;
            RaycastHit2D hit = Physics2D.Raycast(origin, dir, 0.5f, wallLayer);
            Debug.DrawRay(origin, dir * 0.5f, hit.collider ? Color.red : Color.green, 0.1f);
            blockedDirections[dir] = hit.collider != null;
        }
    }

    public void VibrateController(float frequency)
    {
        if (Gamepad.current != null)
            Gamepad.current.SetMotorSpeeds(frequency, frequency);
    }

    void StopVibration()
    {
        if (Gamepad.current != null)
            Gamepad.current.SetMotorSpeeds(0f, 0f);
    }

    private void OnTriggerEnter2D(Collider2D collider)
    {
        if (collider.CompareTag("PlayerSensor"))
        {
            DetectWalls();

            playerController = GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>();
            if (playerController == null) return;

            Vector2 diff = (Vector2)transform.position - (Vector2)collider.transform.position;
            Vector2 pushDirection = Vector2.zero;

            if (Mathf.Abs(diff.x) > Mathf.Abs(diff.y))
            {
                pushDirection = diff.x > 0 ? Vector2.right : Vector2.left;
            }
            else
            {
                pushDirection = diff.y > 0 ? Vector2.up : Vector2.down;
            }

            if (blockedDirections.ContainsKey(pushDirection) && blockedDirections[pushDirection] == false)
            {
                StartCoroutine(SlideToPosition(pushDirection, slideDistance, slideDuration));
            }
            else if (!killPlayerDeath)
            {
                playerController.obstacleDetection = true;
            }
        }
    }

    private IEnumerator SlideToPosition(Vector2 direction, float distance, float duration)
    {
        VibrateController(0.5f);
        playerController.obstacleMoving = true;

        PolygonCollider2D poly = GetComponent<PolygonCollider2D>();
        if (poly != null) poly.enabled = false;

        Vector2 startPosition = transform.position;
        Vector2 targetPosition = startPosition + direction * distance;
        float elapsedTime = 0f;

        audioSource.Play();
        particleSystem.Play();
        playerController.currentStepCounts++;

        while (elapsedTime < duration)
        {
            transform.position = Vector2.Lerp(startPosition, targetPosition, elapsedTime / duration);
            elapsedTime += Time.deltaTime;
            yield return null;
        }

        transform.position = targetPosition;

        audioSource.Stop();
        particleSystem.Stop(true, ParticleSystemStopBehavior.StopEmitting);

        if (poly != null) poly.enabled = true;
        playerController.obstacleMoving = false;
        StopVibration();
    }
}