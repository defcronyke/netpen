# pylint: disable=redefined-outer-name
# pylint: disable=unused-argument
import pytest
from conftest import get_ns_addr_in_subnet, get_subnet, deploy_script
from conftest import ping, get_route_dev, get_xfrm_packet_counts
from dev.tests.common.utils import gen_examples  # pylint: disable=unused-import


OVERLAY_SUBNET_NAME = 'overlay'
TUNNEL_PARAMS = [('ipip', 'overlay', 'zone1', 'zone2', 'tnl0', True, False),
                 ('ipip6', 'overlay', 'zone1', 'zone2', 'tnl0', True, False),
                 ('gre', 'overlay', 'zone1', 'zone2', 'tnl0', True, False),
                 ('vti', 'green', 'alice', 'bob', 'safe', True, True),
                 ('vti6', 'green', 'alice', 'bob', 'safe', True, True),
                 ('xfrmi', 'green', 'alice', 'bob', 'safe', True, True),
                 ('gre_xfrm', 'overlay', 'zone1', 'zone2', 'tnl0', True, True),
                 ('wireguard', 'green', 'alice', 'bob', 'safe', True, False),
                 ('vxlan', 'overlay', 'zone1', 'zone2', 'tnl0', False, False)]


@pytest.mark.parametrize('name,overlay,z1,z2,dev,is_l3,check_xfrm',
                         TUNNEL_PARAMS)
def test_tunnel(name, overlay, z1, z2, dev, is_l3, check_xfrm, gen_examples,
                cleanup_nets):
    deploy_script('%s.sh' % name)

    subnet = get_subnet(name, overlay)

    z1incidr, z1net = get_ns_addr_in_subnet(z1, subnet)
    z2incidr, z2net = get_ns_addr_in_subnet(z2, subnet)

    assert is_l3 == (z1net != z2net)

    ping(z1, z2incidr)
    ping(z2, z1incidr)

    if check_xfrm:
        assert get_xfrm_packet_counts(z1) == [2, 2]
        assert get_xfrm_packet_counts(z2) == [2, 2]

    assert get_route_dev(z1, z2incidr) == '%s.dev1' % dev
    assert get_route_dev(z2, z1incidr) == '%s.dev2' % dev
