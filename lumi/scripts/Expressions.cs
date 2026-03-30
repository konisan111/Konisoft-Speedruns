using Unity.VisualScripting;
using UnityEngine;

public class Expressions : MonoBehaviour{
     
    public GameObject winningExpression;
    public GameObject outline;
    public GameObject outspawnEffect;
    public GameObject summoningCircle;
    void Update(){
        if (winningExpression.activeInHierarchy) {Destroy(outline); summoningCircle.SetActive(false); outspawnEffect.SetActive(true); Destroy(gameObject);}
    }
}
