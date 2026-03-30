using UnityEngine;

public class MusicToggle : MonoBehaviour
{

    public GameObject onImage;
    public GameObject offImage;
    public GameObject musicObject;
    private bool toggle = true;

    public void toggleMusic()
    {
        if (toggle)
        {
            musicObject.SetActive(false);
            offImage.SetActive(true);
            onImage.SetActive(false);
            toggle = false;
        }
        else
        {
            musicObject.SetActive(true);
            offImage.SetActive(false);
            onImage.SetActive(true);
            toggle = true;
        }
    }
}
