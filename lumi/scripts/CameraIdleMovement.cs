using UnityEngine;

public class CameraIdleMovement : MonoBehaviour {
    public float moveSpeed = 0.1f;
    public float moveRange = 0.5f;
    private Vector3 initialPosition;

    void Start() {
        initialPosition = transform.position;
    }

    void Update() {
        float offsetX = Mathf.PerlinNoise(Time.time * moveSpeed, 0) * moveRange - moveRange / 2;
        float offsetY = Mathf.PerlinNoise(0, Time.time * moveSpeed) * moveRange - moveRange / 2;
        transform.position = initialPosition + new Vector3(offsetX, offsetY, 0);
    }
}
