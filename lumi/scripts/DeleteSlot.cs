using UnityEngine;

public class DeleteSlot : MonoBehaviour{
    public GameObject parentObject;

    public void DeleteAllSlots(){
        foreach (Transform child in parentObject.transform){
            Destroy(child.gameObject);
        }
    }
}
