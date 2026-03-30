using UnityEngine;

public class DeleteAllChildren : MonoBehaviour{
    void Update()
    {
        foreach (Transform child in transform){
            Destroy(child.gameObject);
        }
    }
}
