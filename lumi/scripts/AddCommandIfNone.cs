using UnityEngine;

public class AddCommandIfNone : MonoBehaviour{
    public GameObject childPrefab;

    void Update(){
        if (transform.childCount == 0){
            GameObject newChild = Instantiate(childPrefab);
            newChild.transform.SetParent(transform);
            newChild.transform.localPosition = Vector3.zero;
        }
    }
}
