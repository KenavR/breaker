import com.amazonaws.util.json.JSONObject;
import com.larvalabs.redditchat.Constants;
import models.ChatUser;
import org.junit.Before;
import org.junit.Test;
import play.Logger;
import play.Play;
import play.libs.Mail;
import play.test.Fixtures;
import play.test.UnitTest;
import reddit.BreakerRedditClient;
import reddit.RedditRequestError;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by matt on 4/27/16.
 */
public class TestRedditClient extends BreakerTest {

    @Test
    public void testRefreshToken() throws Exception {
        ChatUser chatUser = getTestUser1();

        // Refresh access token for user
        BreakerRedditClient breakerRedditClient = new BreakerRedditClient();
        String newToken = breakerRedditClient.refreshToken(chatUser.refreshToken);

        Logger.info("Received new token: " + newToken);
        assertNotNull(newToken);

    }

    @Test
    public void testGetFlair() throws Exception {
        ChatUser chatUser = getUser();

        // Refresh access token for user
        BreakerRedditClient breakerRedditClient = new BreakerRedditClient();
        JSONObject hockeyFlair = breakerRedditClient.getRedditUserFlairForSubreddit(chatUser, "hockey");

        Logger.info("Received flair: " + hockeyFlair.toString());
    }

    @Test
    public void testGetSubsModerated() throws Exception {
        ChatUser chatUser = getUser();

        // Refresh access token for user
        BreakerRedditClient breakerRedditClient = new BreakerRedditClient();
        ArrayList<String> subNamesModerated = breakerRedditClient.getSubNamesModerated(chatUser);
        assertEquals(5, subNamesModerated.size());
        assertTrue(subNamesModerated.contains("appchat"));
        assertTrue(subNamesModerated.contains("breakerapp"));
    }

    @Test
    public void testGetModerators() throws Exception {
        BreakerRedditClient client = new BreakerRedditClient();
        List<String> moderatorUsernames = client.getModeratorUsernames(Constants.CHATROOM_DEFAULT);
        assertEquals(4, moderatorUsernames.size());
        assertTrue(moderatorUsernames.contains("megamatt2000"));
        assertTrue(moderatorUsernames.contains("pents900"));
        assertTrue(moderatorUsernames.contains("rickiibeta"));
    }

    @Test
    public void testPrivateSubDetection() throws Exception {
        BreakerRedditClient client = new BreakerRedditClient();
        String megaprivatetest = "megaprivatetest";
        assertTrue(client.isSubredditPrivate(megaprivatetest));

        ChatUser user = getTestUser1();
        ChatUser user2 = getTestUser2();
//        JSONObject subsModerated = client.getSubsModerated(user);
//        Logger.info("Subs: " + subsModerated);
//        JSONObject android = client.getRedditUserFlairForSubreddit(user, "android");
//        Logger.info(android.toString());
        assertTrue(client.doesUserHaveAccessToSubreddit(user, megaprivatetest));
        assertFalse(client.doesUserHaveAccessToSubreddit(user2, megaprivatetest));
        try {
            client.doesUserHaveAccessToSubreddit(user2, "clearlydoesntexist1234567789");
            assertFalse("Should not get here, line above should have thrown not found.", true);
        } catch (RedditRequestError redditRequestError) {
            //
        }
    }

    @Test
    public void testDoesRedditExist() throws Exception {
        BreakerRedditClient client = new BreakerRedditClient();
        assertFalse(client.doesSubredditExist("nowaydoesthisthingexist1298752"));
        assertTrue(client.doesSubredditExist("android"));
    }

    @Test
    public void testGetUserDetails() throws Exception {
        BreakerRedditClient client = new BreakerRedditClient();
        ChatUser user = getTestUser1();
        JSONObject redditUserDetails = client.getRedditUserDetails(user);
        assertEquals(user.getUsername(), redditUserDetails.getString("name"));
        assertTrue(redditUserDetails.getLong("link_karma") > 0);
        assertEquals(0, redditUserDetails.getLong("comment_karma"));
    }
}
