using UnityEngine;
using System.Collections.Generic;

public class Lever : MonoBehaviour
{
    [Header("Connected Gates")]
    [SerializeField] private List<GateObstacle> gates = new List<GateObstacle>();

    [Header("Lever Visuals")]
    [SerializeField] private Sprite leverUpSprite;
    [SerializeField] private Sprite leverDownSprite;

    private Animator animator;
    private SpriteRenderer spriteRenderer;
    private bool isUp = false;

    private bool playerInRange = false;

    private void Awake()
    {
        animator = GetComponent<Animator>();
        spriteRenderer = GetComponent<SpriteRenderer>();
    }

    private void Update()
    {
        if (playerInRange && Input.GetKeyDown(KeyCode.E))
        {
            ToggleLever();
        }
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            playerInRange = true;
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            playerInRange = false;
        }
    }

    public void ToggleLever()
    {
        isUp = !isUp;
        animator.Play("Lever");
        spriteRenderer.sprite = isUp ? leverUpSprite : leverDownSprite;

        if (isUp)
        {
            foreach (var gate in gates)
                if (gate != null) gate.GateUp();
        }
        else
        {
            foreach (var gate in gates)
                if (gate != null) gate.GateDown();
        }
    }
}
