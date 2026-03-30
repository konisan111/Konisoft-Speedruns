using UnityEngine;

public class DisableStartAnimUI : MonoBehaviour
{
    public GameObject[] uiElements;

    private void Start()
    {
        uiElements = GameObject.FindGameObjectsWithTag("StartUpAnimatedUI");
    }

    public void OnClick()
    {
        foreach (GameObject item in uiElements)
        {
            Animator animator = item.GetComponent<Animator>();
            animator.enabled = false;
        }
    }
}
