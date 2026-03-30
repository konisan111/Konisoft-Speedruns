using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class HoldingZoomer : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
{
    public bool isHolding = false;
    private float holdTime = 0f;
    public float requiredHoldDuration = 0.2f;
    public bool holdForZoomIn;
    public bool holdForZoomOut;
    public float zoomSpeed = 5f;
    public Camera targetCamera;

    void Update()
    {
        if (isHolding && targetCamera != null)
        {
            holdTime += Time.deltaTime;

            if (holdForZoomIn)
            {
                targetCamera.fieldOfView -= zoomSpeed * Time.deltaTime;
            }
            else if (holdForZoomOut)
            {
                targetCamera.fieldOfView += zoomSpeed * Time.deltaTime;
            }
        }
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        isHolding = true;
        holdTime = 0f;
        Debug.Log("Button Pressed!");
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        isHolding = false;
        holdTime = 0f;
        Debug.Log("Button Released!");
    }
}
