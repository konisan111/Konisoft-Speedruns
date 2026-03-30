using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class ResetCursorImage : MonoBehaviour {
    public Image uiCursor;
    public Sprite originalCursorSprite;

    public void OnClick() { uiCursor.sprite = originalCursorSprite; }
}
