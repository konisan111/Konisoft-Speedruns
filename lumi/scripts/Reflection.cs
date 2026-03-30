using UnityEngine;

public class Reflection : MonoBehaviour
{
    private Quaternion xFlip;

    void Start() { xFlip = Quaternion.Euler(180f, 0f, 0f); }

    void Update()
    {
        Quaternion mirroredRotation = Quaternion.Inverse(transform.parent.rotation);
        transform.rotation = mirroredRotation * xFlip;
    }
}
