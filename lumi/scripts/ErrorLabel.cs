using System.Collections;
using UnityEngine;

public class ErrorLabel : MonoBehaviour
{
    void Start(){
        StartCoroutine(ErrorDespawn());
    }
    IEnumerator ErrorDespawn(){
        yield return new WaitForSeconds(7);
        gameObject.SetActive(false);
    }
}
