using UnityEngine;
using UnityEngine.InputSystem;

[RequireComponent(typeof(Camera))]
public class CameraHovering : MonoBehaviour
{
    public Camera cinematicCamera;
    public Camera gameOverCamera;

    public bool autoLock;

    public float mouseDragSpeed = 0.5f;
    public float controllerMoveSpeed = 5f;
    public Vector2 minPosition = new(-10f, -10f);
    public Vector2 maxPosition = new(10f, 10f);

    public float zoomSpeed = 50f;
    public float minFOV = 20f;
    public float maxFOV = 60f;

    public Transform player;
    public Vector2 followZoneSize = new Vector2(5f, 5f);
    public float followSmoothness = 3f;

    private Camera cam;
    private bool isDragging = false;

    void Awake()
    {
        cam = GetComponent<Camera>();
    }

    void Update()
    {
        if (!autoLock)
            HandleMovement();

        if (!isDragging)
            HandleFollowZone();

        UpdateOtherCameras();
    }

    private void HandleMovement()
    {
        Vector3 move = Vector3.zero;

        if (Mouse.current != null && Mouse.current.rightButton.isPressed)
        {
            isDragging = true;
            Vector2 delta = Mouse.current.delta.ReadValue();
            move.x -= delta.x * mouseDragSpeed * Time.deltaTime * 100f;
            move.y -= delta.y * mouseDragSpeed * Time.deltaTime * 100f;
        }
        else
        {
            isDragging = false;
        }

        if (Gamepad.current != null)
        {
            Vector2 stick = Gamepad.current.rightStick.ReadValue();
            move.x += stick.x * controllerMoveSpeed * Time.deltaTime * 10f;
            move.y += stick.y * controllerMoveSpeed * Time.deltaTime * 10f;
        }

        Vector3 newPos = transform.position + move;
        newPos.x = Mathf.Clamp(newPos.x, minPosition.x, maxPosition.x);
        newPos.y = Mathf.Clamp(newPos.y, minPosition.y, maxPosition.y);
        transform.position = newPos;

        float zoomInput = 0f;
        if (Mouse.current != null)
            zoomInput += Mouse.current.scroll.ReadValue().y;
        if (Gamepad.current != null)
            zoomInput += Gamepad.current.rightTrigger.ReadValue() - Gamepad.current.leftTrigger.ReadValue();

        if (Mathf.Abs(zoomInput) > 0.01f && !cam.orthographic)
        {
            cam.fieldOfView = Mathf.Clamp(cam.fieldOfView - zoomInput * zoomSpeed * Time.deltaTime,
                                          minFOV, maxFOV);
        }
    }

    [SerializeField] private float followSpeed = 0.25f;
    private Vector3 currentVelocity = Vector3.zero;

    private void HandleFollowZone()
    {
        if (player == null) return;

        Vector3 camPos = transform.position;
        Vector3 playerPos = player.position;

        float halfWidth = followZoneSize.x * 0.5f;
        float halfHeight = followZoneSize.y * 0.5f;

        bool insideX = playerPos.x > camPos.x - halfWidth && playerPos.x < camPos.x + halfWidth;
        bool insideY = playerPos.y > camPos.y - halfHeight && playerPos.y < camPos.y + halfHeight;

        if (!insideX || !insideY)
        {
            Vector3 targetPos = new Vector3(playerPos.x, playerPos.y, camPos.z);

            transform.position = Vector3.SmoothDamp(
                camPos,
                targetPos,
                ref currentVelocity,
                followSpeed
            );
        }
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
        if (Gamepad.current != null) { Gamepad.current.SetMotorSpeeds(0f, 0f); }
    }

    private void UpdateOtherCameras()
    {
        if (cinematicCamera != null)
        {
            cinematicCamera.transform.position = transform.position;
            cinematicCamera.transform.rotation = transform.rotation;
            cinematicCamera.fieldOfView = cam.fieldOfView;
            cinematicCamera.orthographic = cam.orthographic;
            cinematicCamera.orthographicSize = cam.orthographicSize;
        }

        if (gameOverCamera != null)
        {
            gameOverCamera.transform.position = transform.position;
            gameOverCamera.transform.rotation = transform.rotation;
            gameOverCamera.fieldOfView = cam.fieldOfView;
            gameOverCamera.orthographic = cam.orthographic;
            gameOverCamera.orthographicSize = cam.orthographicSize;
        }
    }
}