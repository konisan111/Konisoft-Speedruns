using UnityEngine;

public class ReflectionCamera : MonoBehaviour
{
    public GameObject reflectingObject;
    private Vector3 direction;

    void Update()
    {
        direction = new Vector3(
            reflectingObject.transform.position.x,
            reflectingObject.transform.position.y,
            gameObject.transform.position.z
        );

        gameObject.transform.position = direction;
    }
}
