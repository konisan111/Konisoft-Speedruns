using UnityEngine;
using System.Collections;

public class TypeshakerEffect : MonoBehaviour{
    public float shakeIntesnity;
    public float shakePosition;
    public bool preventGlitch;

    void Update(){if(preventGlitch == false)StartCoroutine(ShakingText());}

    IEnumerator ShakingText(){
        preventGlitch = true;
        yield return new WaitForSeconds(shakeIntesnity);
        transform.position = new Vector3(transform.position.x + shakePosition, transform.position.y, transform.position.z);
        yield return new WaitForSeconds(shakeIntesnity);
        transform.position = new Vector3(transform.position.x - shakePosition, transform.position.y, transform.position.z);
        preventGlitch = false;
    }
}
