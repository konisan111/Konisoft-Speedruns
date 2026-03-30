using UnityEngine;
using UnityEngine.UI;

public class LevelLocker : MonoBehaviour
{
    public string sceneName;
    private Button button;

    void OnEnable()
    {
        button = GetComponent<Button>();
        CheckLevelAccess();
    }

    void CheckLevelAccess()
    {
        if (GameManager.Instance == null || button == null) return;
        if (string.IsNullOrEmpty(sceneName)) return;

        int stars = GameManager.Instance.GetLevelStars(sceneName);
        button.interactable = stars > 0;
    }
}
