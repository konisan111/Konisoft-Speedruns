using UnityEngine;

public class CameraBegining : MonoBehaviour
{
    public Transform target;
    public float duration = 0.5f;

    private Vector3 startPos;
    private Vector3 originalPosition;
    private float elapsed = 0f;
    private bool isMoving = false;

    public bool setToPlayer = true;
    CameraHovering ch;

    void Start()
    {
        ch = GetComponent<CameraHovering>();
        originalPosition = transform.position;
    }

    void Update()
    {
        if (setToPlayer)
        {
            transform.position = target.position;
            startPos = transform.position;
            setToPlayer = false;
            isMoving = true;
            elapsed = 0f;
        }

        if (isMoving)
        {
            elapsed += Time.deltaTime;
            float percent = elapsed / duration;

            float smoothPercent = Mathf.SmoothStep(0, 1, percent);

            transform.position = Vector3.Lerp(startPos, originalPosition, smoothPercent);

            if (percent >= 1.0f)
            {
                transform.position = originalPosition;
                isMoving = false;
                ch.enabled = true;
                this.enabled = false;
            }
        }
    }
}