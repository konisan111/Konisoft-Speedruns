using UnityEngine;
using UnityEngine.EventSystems;

public class ButtonSelection : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{
    public GameObject targetObject;

    public void OnPointerEnter(PointerEventData eventData)
    {
        if (targetObject != null) { targetObject.SetActive(true); }
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        if (targetObject != null) { targetObject.SetActive(false); }
    }
}
