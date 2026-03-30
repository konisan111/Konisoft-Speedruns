using UnityEngine;

public class SlotCreater : MonoBehaviour{
    public GameObject prefab;

    public Transform parentTransform;

    void Update(){
        gameObject.transform.SetSiblingIndex(parentTransform.transform.childCount -1);
    } 

    public void SpawnObject(){
        if (prefab != null && parentTransform != null){
            GameObject spawnedObject = Instantiate(prefab, parentTransform);
            spawnedObject.transform.localPosition = Vector3.zero;
        }
        else{Debug.LogError("Prefab or ParentTransform is not assigned.");}
    }
    
}
