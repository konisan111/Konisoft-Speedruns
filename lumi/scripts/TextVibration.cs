using UnityEngine;

public class TextVibration : MonoBehaviour{
    public float vibrationSpeed = 50f;
    public float vibrationAmount = 0.1f;
    private Vector3 startPosition;

    void Start(){
        startPosition = transform.localPosition;
    }

    void Update(){
        float zOffset = Mathf.Sin(Time.time * vibrationSpeed) * vibrationAmount;
        transform.localPosition = new Vector3(startPosition.x, startPosition.y, startPosition.z + zOffset);
    }
}
