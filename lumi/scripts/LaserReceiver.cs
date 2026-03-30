using UnityEngine;

public class LaserReceiver : MonoBehaviour
{
    public GameObject laserManagerObject;
    public GameObject activatedPhase;
    public GameObject notActivatedPhase;
    public bool isActivated = false;

    private AudioSource audioSource;
    private LaserManager laserManager;
    private int objectsOnButton = 0;

    private void Start()
    {
        audioSource = GetComponent<AudioSource>();
        if (laserManagerObject != null)
            laserManager = laserManagerObject.GetComponent<LaserManager>();

        activatedPhase.SetActive(false);
        notActivatedPhase.SetActive(true);
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Enemy"))
        {
            objectsOnButton++;

            if (!isActivated)
            {
                ActivateLaser();
            }
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Enemy"))
        {
            objectsOnButton--;

            if (objectsOnButton <= 0)
            {
                objectsOnButton = 0;
                DeactivateLaser();
            }
        }
    }

    private void ActivateLaser()
    {
        isActivated = true;
        if (audioSource != null) audioSource.Play();

        activatedPhase.SetActive(true);
        notActivatedPhase.SetActive(false);

        if (laserManager != null)
            laserManager.laserPoints += 1;
    }

    private void DeactivateLaser()
    {
        isActivated = false;
        activatedPhase.SetActive(false);
        notActivatedPhase.SetActive(true);

        if (laserManager != null)
            laserManager.laserPoints -= 1;
    }
}