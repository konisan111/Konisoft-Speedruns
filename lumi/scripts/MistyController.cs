using UnityEngine;

public class MistyController : MonoBehaviour
{
    void Update()
    {
        bool shouldBeActive = GameManager.Instance.isMistyEnabled;

        if (gameObject.activeSelf != shouldBeActive)
            gameObject.SetActive(shouldBeActive);
    }
}