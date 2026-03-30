using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.InputSystem;
using System.Collections;

public class SplashScreenSkip : MonoBehaviour
{
    public string sceneToLoad;
    public GameObject blackFlash;
    private bool isSkipping = false;

    void Update()
    {
        if (!isSkipping && (Keyboard.current.anyKey.wasPressedThisFrame || Mouse.current.leftButton.wasPressedThisFrame))
            if (!string.IsNullOrEmpty(sceneToLoad))
                StartCoroutine(SkipSequence());
    }

    IEnumerator SkipSequence()
    {
        isSkipping = true;
        if (blackFlash != null)
            blackFlash.SetActive(true);

        yield return new WaitForSeconds(0.5f);
        SceneManager.LoadScene(sceneToLoad);
    }
}