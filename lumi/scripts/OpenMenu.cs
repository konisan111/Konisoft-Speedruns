using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;

public class OpenMenu : MonoBehaviour{
    public void OnClickButton() {
        StartCoroutine(ReloadProcessOfLevel());
    }

    IEnumerator ReloadProcessOfLevel()
    {
        yield return new WaitForSeconds(5f);
        SceneManager.LoadScene("Menu");
    }
}
