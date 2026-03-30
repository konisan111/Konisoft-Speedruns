using UnityEngine;
using UnityEngine.UI;

public class DeathsCounterUI : MonoBehaviour
{
    public Text deathText;

    void Update()
    {
        if (GameManager.Instance != null)
        {
            deathText.text = GameManager.Instance.GetDeathCount() + "x";
        }
        else { print("No game manager found!"); }
    }
}
