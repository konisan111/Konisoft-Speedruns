using UnityEngine;

public class CinematicCamera : MonoBehaviour
{
    public Transform target;
    public float moveSpeed = 5f;
    public float zoomSpeed = 5f;
    public float targetFOV = 5f;
    public float distanceFromObject;
    public float distanceFromOriY;
    public bool enableYManipulation;

    private Camera cam;

    void Start() { cam = GetComponent<Camera>(); }

    void Update()
    {
        if (target != null)
        {
            if (enableYManipulation)
            {
                Vector3 targetPosition = new Vector3(target.position.x + distanceFromObject, target.position.y + distanceFromOriY, transform.position.z);
                transform.position = Vector3.Lerp(transform.position, targetPosition, moveSpeed * Time.deltaTime);
            }

            else if (enableYManipulation == false)
            {
                Vector3 targetPosition = new Vector3(target.position.x + distanceFromObject, target.position.y, transform.position.z);
                transform.position = Vector3.Lerp(transform.position, targetPosition, moveSpeed * Time.deltaTime);
            }

            cam.fieldOfView = Mathf.Lerp(cam.fieldOfView, targetFOV, zoomSpeed * Time.deltaTime);
        }
    }
}
