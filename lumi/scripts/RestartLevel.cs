using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;

public class RestartLevel : MonoBehaviour
{
    public GameObject fadeOut;
    public GameObject cherryLoading;
    public void ReloadScene()
    {
        StartCoroutine(ReloadProcessOfLevel());
    }

    IEnumerator ReloadProcessOfLevel() {
        fadeOut.SetActive(true);
        cherryLoading.SetActive(true);
        yield return new WaitForSeconds(5f);
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
}
