using UnityEngine;
using UnityEngine.UI;

public class VersionDisplay : MonoBehaviour
{
    public Text releaseText;

    void Start()
    {
        releaseText.text = GameManager.Instance.GetVersion();
    }
}
