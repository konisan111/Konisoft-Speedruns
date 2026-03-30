using UnityEngine;
using UnityEngine.UI;

public class SpawnScoreItemUI : MonoBehaviour
{
    public GameObject uiItem;
    public Canvas targetCanvas;
    private Camera mainCamera;

    void Start()
    {
        mainCamera = Camera.main;
        SpawnItemUI();
    }

    void SpawnItemUI()
    {
        Vector3 screenPos = mainCamera.WorldToScreenPoint(transform.position);

        if (screenPos.z > 0 &&
            screenPos.x > 0 && screenPos.x < Screen.width &&
            screenPos.y > 0 && screenPos.y < Screen.height)
        {
            GameObject uiElement = Instantiate(uiItem, targetCanvas.transform);

            uiElement.GetComponent<RectTransform>().position = screenPos;
        }
    }
}
