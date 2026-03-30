using UnityEngine;

public class ItemDescription : MonoBehaviour
{
    public Vector2 offset = new Vector2(100f, -10f);
    private RectTransform rectTransform;
    private Canvas parentCanvas;

    void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        parentCanvas = GetComponentInParent<Canvas>();

        if (rectTransform == null)
            Debug.LogError("ItemDescription requires a RectTransform!");
        if (parentCanvas == null)
            Debug.LogError("ItemDescription requires a Canvas in its parent hierarchy!");
    }

    void Update()
    {
        FollowCursor();
    }

    private void FollowCursor()
    {
        if (rectTransform == null || parentCanvas == null) return;

        Vector2 localPoint;
        RectTransformUtility.ScreenPointToLocalPointInRectangle(
            parentCanvas.transform as RectTransform,
            Input.mousePosition,
            parentCanvas.renderMode == RenderMode.ScreenSpaceOverlay ? null : parentCanvas.worldCamera,
            out localPoint
        );

        rectTransform.localPosition = localPoint + offset;
    }
}
