using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;

public class SkipStory : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
{
    private float holdTimer = 0f;
    private bool isHolding = false;

    public GameObject skipText;
    public float holdDuration = 2.0f;
    public UnityEvent onHoldComplete;

    void Update()
    {
        if (isHolding)
        {
            holdTimer += Time.deltaTime;

            if (holdTimer >= holdDuration)
            {
                onHoldComplete.Invoke();
            }
        }
    }
    public void OnPointerDown(PointerEventData eventData)
    {
        isHolding = true;
        if (skipText != null) skipText.SetActive(true);
    }
    public void OnPointerUp(PointerEventData eventData)
    {
        ResetHold();
    }

    void ResetHold()
    {
        isHolding = false;
        holdTimer = 0f;
        if (skipText != null) skipText.SetActive(false);
    }
}