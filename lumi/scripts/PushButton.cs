using UnityEngine;

public class PushButton : MonoBehaviour
{
    public GameObject pushManagerObject;
    public GameObject pushedDownPhase;
    public GameObject notPushedPhase;
    public bool isPushed = false;

    private AudioSource audioSource;
    private PushManager pushManager;
    private int objectsOnButton = 0;

    private void Start()
    {
        audioSource = GetComponent<AudioSource>();
        if (pushManagerObject != null)
            pushManager = pushManagerObject.GetComponent<PushManager>();

        pushedDownPhase.SetActive(false);
        notPushedPhase.SetActive(true);
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Wall"))
        {
            objectsOnButton++;

            if (!isPushed)
            {
                ActivateButton();
            }
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Wall"))
        {
            objectsOnButton--;

            if (objectsOnButton <= 0)
            {
                objectsOnButton = 0;
                DeactivateButton();
            }
        }
    }

    private void ActivateButton()
    {
        isPushed = true;
        if (audioSource != null) audioSource.Play();

        pushedDownPhase.SetActive(true);
        notPushedPhase.SetActive(false);

        if (pushManager != null)
            pushManager.pushPoints += 1;
    }

    private void DeactivateButton()
    {
        isPushed = false;
        pushedDownPhase.SetActive(false);
        notPushedPhase.SetActive(true);

        if (pushManager != null)
            pushManager.pushPoints -= 1;
    }
}