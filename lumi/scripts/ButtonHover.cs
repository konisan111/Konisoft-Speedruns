using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class ButtonHover : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler {
    public Image uiCursor;
    public Sprite selectionCursorSprite;
    public Sprite originalCursorSprite;

    public void OnPointerEnter(PointerEventData eventData) { 
        if (uiCursor != null && selectionCursorSprite != null) 
            uiCursor.sprite = selectionCursorSprite;
    }

    public void OnPointerExit(PointerEventData eventData) {
        if (uiCursor != null && selectionCursorSprite != null)
            uiCursor.sprite = originalCursorSprite;
    }
}
