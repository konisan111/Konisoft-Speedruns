using UnityEngine;

public class TrashingDirection : MonoBehaviour{
    public void DirectionDestroyOnClickOrTap(){
        Debug.Log("Direction element clicked!");
        Destroy(transform.parent.gameObject);
    }
}
