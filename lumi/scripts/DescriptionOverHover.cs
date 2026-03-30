using UnityEngine;
using UnityEngine.InputSystem;

public class DescriptionOverHover : MonoBehaviour
{
    public float scaleAmount = 1f;
    public float scaleSpeed = 5f;
    private Vector3 originalScale;
    private Vector3 targetScale;

    public GameObject controllerCursor;
    public GameObject targetObject;
    public GameObject lumiThinkingObject;
    public bool doNotDisplayYet = false;

    private bool isHovering = false;
    private bool usingController = false;
    private PlayerInput playerInput;

    private RectTransform cursorRect;
    private Canvas cursorCanvas;

    void Awake()
    {
        playerInput = FindObjectOfType<PlayerInput>();
    }

    void Start()
    {
        if (controllerCursor == null)
            controllerCursor = GameObject.FindGameObjectWithTag("ControllerCursor");

        if (controllerCursor == null)
        {
            Debug.LogError("ControllerCursor not found. Ensure it has tag 'ControllerCursor'.");
            enabled = false;
            return;
        }

        cursorRect = controllerCursor.GetComponent<RectTransform>();
        cursorCanvas = controllerCursor.GetComponentInParent<Canvas>();

        if (cursorRect == null || cursorCanvas == null)
        {
            Debug.LogError("ControllerCursor must be a UI element (RectTransform) under a Canvas.");
            enabled = false;
            return;
        }

        originalScale = controllerCursor.transform.localScale;
        targetScale = originalScale;
    }

    void Update()
    {
        if (isHovering && usingController && !doNotDisplayYet)
        {
            if (Gamepad.current != null && Gamepad.current.buttonSouth.wasPressedThisFrame)
            {
                SafeSetActive(targetObject, true);
                SafeSetActive(lumiThinkingObject, true);
            }
        }

        if (targetObject != null && targetObject.activeInHierarchy)
        {
            MoveCursorToTargetUI(targetObject);
        }
    }

    private void OnMouseOver()
    {
        isHovering = true;
        if (!usingController && !doNotDisplayYet)
        {
            SafeSetActive(targetObject, true);
            SafeSetActive(lumiThinkingObject, true);
        }
    }

    private void OnMouseExit()
    {
        isHovering = false;
        SafeSetActive(targetObject, false);
        SafeSetActive(lumiThinkingObject, false);
    }

    private void SafeSetActive(GameObject go, bool active)
    {
        if (go != null && go.activeSelf != active)
            go.SetActive(active);
    }

    private void MoveCursorToTargetUI(GameObject uiTarget)
    {
        RectTransform targetRect = uiTarget.GetComponent<RectTransform>();
        if (targetRect == null) return;

        Vector2 screenPoint;
        if (!TryGetScreenPoint(targetRect, out screenPoint)) return;

        RectTransform canvasRect = cursorCanvas.transform as RectTransform;
        Camera uiCam = cursorCanvas.renderMode == RenderMode.ScreenSpaceCamera ? cursorCanvas.worldCamera : null;

        Vector2 localPoint;
        if (RectTransformUtility.ScreenPointToLocalPointInRectangle(canvasRect, screenPoint, uiCam, out localPoint))
        {
            cursorRect.anchoredPosition = localPoint;
        }
    }

    private bool TryGetScreenPoint(RectTransform targetRect, out Vector2 screenPoint)
    {
        screenPoint = default;

        Canvas targetCanvas = targetRect.GetComponentInParent<Canvas>();
        if (targetCanvas == null)
        {
            Vector3 sp = Camera.main != null ? Camera.main.WorldToScreenPoint(targetRect.position) : Vector3.zero;
            screenPoint = sp;
            return true;
        }

        switch (targetCanvas.renderMode)
        {
            case RenderMode.ScreenSpaceOverlay:
                {
                    Vector3 worldPos = targetRect.TransformPoint(GetPivotLocal(targetRect));
                    screenPoint = RectTransformUtility.WorldToScreenPoint(null, worldPos);
                    return true;
                }
            case RenderMode.ScreenSpaceCamera:
                {
                    Camera cam = targetCanvas.worldCamera != null ? targetCanvas.worldCamera : Camera.main;
                    if (cam == null) return false;
                    Vector3 worldPos = targetRect.TransformPoint(GetPivotLocal(targetRect));
                    screenPoint = RectTransformUtility.WorldToScreenPoint(cam, worldPos);
                    return true;
                }
            case RenderMode.WorldSpace:
                {
                    Camera cam = Camera.main;
                    if (cam == null) return false;
                    Vector3 worldPos = targetRect.TransformPoint(GetPivotLocal(targetRect));
                    screenPoint = cam.WorldToScreenPoint(worldPos);
                    return true;
                }
            default:
                return false;
        }
    }

    private Vector3 GetPivotLocal(RectTransform rt)
    {
        Vector2 size = rt.rect.size;
        Vector2 pivot = rt.pivot;
        Vector2 pivotOffset = new Vector2((pivot.x - 0.5f) * size.x, (pivot.y - 0.5f) * size.y);
        return pivotOffset;
    }
}
