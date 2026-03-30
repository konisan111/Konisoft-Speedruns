using UnityEngine;

public class MilithHordController : MonoBehaviour
{
    [Header("Movement Settings")]
    public bool moveOnX = true;
    public float moveDistance = 1f;
    public float moveSpeed = 2f;
    public int maxSteps = 4;

    [Header("Step Trigger")]
    public bool periodSwitch = false;
    private int currentStep = 0;
    private int direction = 1;
    private Vector3 targetPosition;
    private bool isMoving = false;
    private GameObject playerObject;
    private PlayerController playerController;
    private float previousStepCount;
    BoxCollider2D boxCollider;

    void Start()
    {
        boxCollider = GetComponent<BoxCollider2D>();
        playerObject = GameObject.FindGameObjectWithTag("Player");
        playerController = playerObject.GetComponent<PlayerController>();
        targetPosition = transform.position;
    }

    void Update()
    {
        float currentStepCount = playerController.currentStepCounts;

        if (currentStepCount != previousStepCount)
        {
            if ((currentStepCount % 1 == 0 && !periodSwitch) || (currentStepCount % 1 != 0 && periodSwitch))
            {
                MoveSegment();
            }
            previousStepCount = currentStepCount;
        }

        if (isMoving)
        {
            transform.position = Vector3.MoveTowards(transform.position, targetPosition, moveSpeed * Time.deltaTime);
            if (Vector3.Distance(transform.position, targetPosition) < 0.001f)
            {
                transform.position = targetPosition;
                isMoving = false;
            }
        }
    }

    public void MoveSegment()
    {
        if (isMoving) return;

        if (Mathf.Abs(currentStep + direction) > maxSteps)
        {
            currentStep = 0;
            direction *= -1;
        }

        currentStep += direction;

        Vector3 offset = moveOnX ? Vector3.right : Vector3.up;
        targetPosition = transform.position + offset * direction * moveDistance;

        isMoving = true;
    }
}