using UnityEngine;

public class WinZoom : MonoBehaviour
{
    public CameraController cameraController;
    public Transform target;
    public float smoothSpeed = 0.125f;
    public Vector3 offset;
    public float zoomSpeed = 2f;
    public float targetOrthoSize = 3.88f;

    void LateUpdate()
    {
        cameraController.enabled = false;
        Vector3 desiredPosition = target.position + offset;
        Vector3 smoothedPosition = Vector3.Lerp(transform.position, desiredPosition, smoothSpeed);
        transform.position = new Vector3(smoothedPosition.x, smoothedPosition.y, transform.position.z);

        float targetZoom = Mathf.Clamp(Vector3.Distance(transform.position, target.position) / 2f, 5f, 10f);
        Camera.main.orthographicSize = Mathf.Lerp(Camera.main.orthographicSize, targetOrthoSize, Time.deltaTime * zoomSpeed);
    }
}