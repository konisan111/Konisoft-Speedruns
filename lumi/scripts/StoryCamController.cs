using UnityEngine;

public class StoryCamController : MonoBehaviour
{
    private Vector3 startPosition;
    public float hoverAmount = 0.5f;
    public float maxDistance = 0.3f;

    void Start() { startPosition = transform.position; }

    void Update()
    {
        Vector3 mousePosition = Input.mousePosition;
        mousePosition.z = Camera.main.nearClipPlane;
        Vector3 worldMousePosition = Camera.main.ScreenToWorldPoint(mousePosition);

        Vector3 direction = (worldMousePosition - startPosition).normalized;
        Vector3 targetPosition = startPosition + direction * hoverAmount;

        if (Vector3.Distance(startPosition, targetPosition) > maxDistance) { targetPosition = startPosition + direction * maxDistance; }

        transform.position = targetPosition;
    }
}
