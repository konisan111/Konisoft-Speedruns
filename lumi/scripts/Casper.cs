using UnityEngine;
using System.Collections;

public class Casper : MonoBehaviour
{
    [Header("GameObject Declaring")]
    private GameObject playerObject;
    private PlayerController playerController;

    [Header("Period Switching")]
    public bool periodSwitch;

    [Header("Safety Switch")]
    public bool safetySwitch;
    public int lastStepCount = -2;

    [Header("Animator Controlls")]
    public Animator animator;
    private int s;
    public bool onCollider;

    void Start()
    {
        playerObject = GameObject.FindGameObjectWithTag("Player");
        playerController = playerObject.GetComponent<PlayerController>();
    }

    void Update()
    {
        s = playerController.currentStepCounts;
        if (s != lastStepCount)
        {
            lastStepCount = s;
            safetySwitch = false;
        }

        if (ChangeAllowance())
        {
            Debug.Log("Change allowed");
            if (s % 2 == 0)
            {
                if (periodSwitch) StartCoroutine(CasperAppears());
                else CasperDisappears();
            }
            else
            {
                if (periodSwitch) CasperDisappears();
                else StartCoroutine(CasperAppears());
            }
            safetySwitch = true;
        }
    }

    public bool ChangeAllowance()
    {
        if (playerController.isMoving && !safetySwitch && playerController.closeDeath == false)
            return true;
        else return false;
    }

    public IEnumerator CasperAppears()
    {
        animator.Play("Appear", 0, 0f);
        if (onCollider)
        {
            yield return new WaitForSeconds(0.5f);
            onCollider = false;
            gameObject.tag = "Enemy";
        }
        else { gameObject.tag = "Enemy"; }
    }

    public void CasperDisappears()
    {
        gameObject.tag = "Untagged";
        animator.Play("Disappear", 0, 0f);
    }

    public void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.tag == "Player")
            onCollider = true;
    }
    public void OnCollisionStay2D(Collision2D collision)
    {
        if (collision.gameObject.tag == "Player")
            onCollider = true;
    }
}
