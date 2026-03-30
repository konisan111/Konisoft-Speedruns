using UnityEngine;
using System.Linq;

public class DisableAllEnviorments : MonoBehaviour {
    public GameObject[] levelEnviorments;

    void Start() {
        levelEnviorments = Resources.FindObjectsOfTypeAll<GameObject>()
            .Where(obj => obj.CompareTag("MenuEnviorments"))
            .ToArray();
    }

    public void OnClick() {
        foreach (GameObject item in levelEnviorments){
            item.SetActive(false);
        }
    }
}
