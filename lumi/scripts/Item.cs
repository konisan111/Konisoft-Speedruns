using System.Collections;
using UnityEngine;

public class Item : MonoBehaviour
{
    public bool spawnsItemUI;
    public GameObject itemUI;
    public float floatHeight = 0.1f;
    public float floatSpeed = 1f;
    public float startDelay = 1f;
    public float cooldown = 2f;

    public GameObject blowEffect;

    private Vector3 startPos;
    private bool isFloatingUp = true;
    private bool hasStartedFloating = false;
    private bool isCooldown = false;

    void Start()
    {
        startPos = transform.position;
        StartCoroutine(StartFloating());
    }

    void Update()
    {
        if (hasStartedFloating && !isCooldown)
        {
            if (isFloatingUp)
            {
                transform.Translate(Vector3.up * floatSpeed * Time.deltaTime);
                if (transform.position.y >= startPos.y + floatHeight)
                {
                    isFloatingUp = false;
                }
            }
            else
            {
                transform.Translate(Vector3.down * floatSpeed * Time.deltaTime);
                if (transform.position.y <= startPos.y)
                {
                    isFloatingUp = true;
                    StartCoroutine(CooldownCoroutine());
                }
            }
        }
    }

    IEnumerator StartFloating()
    {
        yield return new WaitForSeconds(startDelay);
        hasStartedFloating = true;
    }

    IEnumerator CooldownCoroutine()
    {
        isCooldown = true;
        yield return new WaitForSeconds(cooldown);
        isCooldown = false;
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.tag == "Player")
        {
            Instantiate(blowEffect, transform.position, transform.rotation);
            if (spawnsItemUI) { Instantiate(itemUI, transform.position, transform.rotation); }
            Destroy(gameObject);
        }
    }
}