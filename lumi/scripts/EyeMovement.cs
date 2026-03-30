using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.Controls;

public class EyeMovement : MonoBehaviour
{
    [Header("References")]
    public Transform reference;
    public GameObject playerObject;

    [Header("Movement Settings")]
    public float factor = 0.25f;
    public float limit = 0.08f;
    public bool doLookAround = true;
    public bool bypassPlayer;

    [Header("Player Settings")]
    private PlayerController playerController;
    public bool callMeToReset;

    [Header("UI Tracking")]
    private bool lookAtSelectedUI = false;
    private enum InputMethod { Mouse, Controller }
    private InputMethod lastInput = InputMethod.Mouse;

    private Vector3 center;
    private Vector3 referencePoint;
    private Vector3 originalPoint;

    void Start()
    {
        if (!bypassPlayer) playerController = playerObject.GetComponent<PlayerController>();

        referencePoint = reference.position;
        originalPoint = referencePoint;
    }

    void Update()
    {
        center = RectTransformUtility.WorldToScreenPoint(Camera.main, transform.position);

        DetectInputMethod();

        if (bypassPlayer)
        {
            if (doLookAround) TrackTarget();
        }
        else
        {
            HandlePlayerMovement();
        }
    }

    private void HandlePlayerMovement()
    {
        if (playerController.isMoving || playerController.starTPTriggered)
        {
            callMeToReset = true;
        }

        if (!playerController.isMoving && !callMeToReset && !playerController.starTPTriggered)
        {
            if (doLookAround) TrackTarget();
        }

        if (!playerController.isMoving && callMeToReset && !playerController.starTPTriggered)
        {
            referencePoint = reference.position;
            callMeToReset = false;
            TrackTarget();
        }
    }

    private void DetectInputMethod()
    {
        bool controllerUsed = false;
        bool mouseUsed = false;

        if (Gamepad.current != null)
        {
            Vector2 stick = Gamepad.current.rightStick.ReadValue();
            if (stick.magnitude > 0.1f) controllerUsed = true;

            foreach (var control in Gamepad.current.allControls)
            {
                if (control is ButtonControl button && button.wasPressedThisFrame)
                {
                    controllerUsed = true;
                    break;
                }
            }
        }

        if (Mouse.current != null)
        {
            Vector2 delta = Mouse.current.delta.ReadValue();
            if (delta.magnitude > 0.1f) mouseUsed = true;
        }

        if (controllerUsed) lastInput = InputMethod.Controller;
        else if (mouseUsed) lastInput = InputMethod.Mouse;

        lookAtSelectedUI = lastInput == InputMethod.Controller;
    }

    private void TrackTarget()
    {
        Vector3 targetScreenPos;

        if (lookAtSelectedUI)
        {
            GameObject selected = EventSystem.current.currentSelectedGameObject;

            if (selected != null)
            {
                RectTransform rt = selected.GetComponent<RectTransform>();
                if (rt != null)
                {
                    Canvas canvas = rt.GetComponentInParent<Canvas>();
                    if (canvas != null)
                    {
                        if (canvas.renderMode == RenderMode.ScreenSpaceCamera || canvas.renderMode == RenderMode.WorldSpace)
                            targetScreenPos = canvas.worldCamera.WorldToScreenPoint(rt.position);
                        else
                            targetScreenPos = RectTransformUtility.WorldToScreenPoint(null, rt.position);
                    }
                    else
                    {
                        targetScreenPos = Input.mousePosition;
                    }
                }
                else
                {
                    targetScreenPos = Input.mousePosition;
                }
            }
            else
            {
                targetScreenPos = Input.mousePosition;
            }
        }
        else
        {
            targetScreenPos = Mouse.current != null ? (Vector3)Mouse.current.position.ReadValue() : referencePoint;
        }

        Vector3 dir = (targetScreenPos - center) * factor;
        dir = Vector3.ClampMagnitude(dir, limit);
        Vector3 targetPos = referencePoint + dir;

        transform.position = Vector3.Lerp(transform.position, targetPos, Time.deltaTime * 10f);
    }
}
