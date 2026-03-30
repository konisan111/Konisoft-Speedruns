using UnityEngine;
using UnityEngine.UI;

public class Inserter : MonoBehaviour{
    public Transform grid;
    public GameObject itemPrefab;

    public void AddToFirstEmptySlot(){
        foreach (Transform slot in grid){
            if (slot.childCount == 0){
                Instantiate(itemPrefab, slot);
                break;
            }
        }
    }
}
